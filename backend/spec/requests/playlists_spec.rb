require "rails_helper"

RSpec.describe "Playlists", type: :request do
  before do
    @current_user = FactoryBot.create(:user, :current)
    @other_user = FactoryBot.create(:user, :other)
  end

  describe "GET /playlists" do
    before do
      @my_playlist = FactoryBot.create(:playlist, :my_playlist)
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
    end

    it "playlistの一覧を表示" do
      get playlists_path
      data = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(data["meta"]["elementsCount"]).to be >= 1
    end

    it "title検索ができる" do
      get playlists_path, params: { title: "マイ" }
      data = JSON.parse(response.body)
      data["playlists"].each do |playlist|
        expect(playlist["title"]).to include("マイ")
      end
    end

    it "作成者検索ができる" do
      get playlists_path, params: { creator: @other_user.display_name }
      data = JSON.parse(response.body)
      data["playlists"].each do |playlist|
        expect(playlist["creator_name"]).to include(@other_user.display_name)
      end
    end
  end

  describe "GET /playlists/favorited" do
    before do
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
      @current_user.favorite(@other_playlist)
    end

    it "お気に入りしたプレイリスト一覧を取得できる" do
      get favorited_playlists_path, headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      data = JSON.parse(response.body)
      expect(data["meta"]["elementsCount"]).to be >= 1
      data["playlists"].each do |playlist|
        expect(playlist["favorited"]).to eq(true)
      end
      expect(response.status).to eq(200)
    end
  end

  describe "GET /playlists/:id" do
    before do
      @my_playlist = FactoryBot.create(:playlist, :my_playlist)
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
    end

    it "自分のプレイリストを表示できる" do
      get playlist_path(@my_playlist.slug)
      data = JSON.parse(response.body)
      expect(data["creator_name"]).to eq(@current_user.display_name)
      expect(response.status).to eq(200)
    end

    it "他人のプレイリストを表示できる" do
      get playlist_path(@other_playlist.slug)
      data = JSON.parse(response.body)
      expect(data["creator_name"]).to eq(@other_user.display_name)
      expect(response.status).to eq(200)
    end

    it "favoriteしたらちゃんと反映される" do
      @current_user.favorite(@other_playlist)
      get playlist_path(@other_playlist.slug), headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      data = JSON.parse(response.body)
      expect(data["favorited"]).to eq(true)
    end
  end

  describe "POST /playlists" do
    it "適切なuserAccessDigestとuserIdの組でplaylistを作成できる" do
      expect {
        post playlists_path, params: { title: "テスト用プレイリスト" }, headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      }.to change(Playlist, :count).by(1)
    end

    it "不適切なuserAccessDigestのときにplaylistを作成できない" do
      expect {
        post playlists_path, params: { title: "テスト用プレイリスト" }, headers: { "userAccessDigest": @other_user.convert_digest, "userId": @current_user.id }
      }.not_to change(Playlist, :count)
    end
  end

  describe "PATCH /playlists/:id" do
    it "自分のplaylistを更新できる" do
      @my_playlist = FactoryBot.create(:playlist, :my_playlist)
      patch playlist_path(@my_playlist.slug), params: { title: "新しいプレイリスト名" }, headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      expect(response.status).to eq(201)
      expect(@my_playlist.reload.title).to eq("新しいプレイリスト名")
    end

    it "他人のplaylistを更新できない" do
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
      patch playlist_path(@other_playlist.slug), params: { title: "新しいプレイリスト名" }, headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      expect(response.status).to eq(403)
      expect(@other_playlist.reload.title).not_to eq("新しいプレイリスト名")
    end
  end

  describe "DELETE /playlists/:id" do
    it "自分のplaylistを削除できる" do
      @my_playlist = FactoryBot.create(:playlist, :my_playlist)
      expect { delete playlist_path(@my_playlist.slug), headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id } }.to change(Playlist, :count).by(-1)
      expect(response.status).to eq(204)
    end

    it "他人のplaylistを削除できない" do
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
      expect { delete playlist_path(@other_playlist.slug), headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id } }.not_to change(Playlist, :count)
      expect(response.status).to eq(403)
    end
  end

  describe "POST /playlists/:id/clips/:clip_id" do
    before do
      FactoryBot.create(:broadcaster, :tokikaze)
      FactoryBot.create(:game, :lol)
      @clip = FactoryBot.create(:clip, :tokikaze_top_clip)
    end

    it "自分のプレイリストにクリップを追加できる" do
      @my_playlist = FactoryBot.create(:playlist, :my_playlist)
      expect {
        post clip_playlist_path(id: @my_playlist.slug, clip_id: @clip.slug),
             headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      }.to change { @my_playlist.clips.count }.by(1)
      expect(response.status).to eq(201)
    end

    it "他人のプレイリストにクリップを追加できない" do
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
      expect {
        post clip_playlist_path(id: @other_playlist.slug, clip_id: @clip.slug),
             headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      }.not_to change { @other_playlist.clips.count }
      expect(response.status).to eq(403)
    end
  end

  describe "DELETE /playlists/:id/clips/:clip_id" do
    before do
      FactoryBot.create(:broadcaster, :tokikaze)
      FactoryBot.create(:game, :lol)
      @clip = FactoryBot.create(:clip, :tokikaze_top_clip)
    end

    it "自分のプレイリストのクリップを削除できる" do
      @my_playlist = FactoryBot.create(:playlist, :my_playlist)
      @my_playlist.add(@clip)
      expect {
        delete clip_playlist_path(id: @my_playlist.slug, clip_id: @clip.slug),
               headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      }.to change { @my_playlist.clips.count }.by(-1)
      expect(response.status).to eq(204)
    end

    it "他人のプレイリストのクリップを削除できる" do
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
      expect {
        delete clip_playlist_path(id: @other_playlist.slug, clip_id: @clip.slug),
               headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      }.not_to change { @other_playlist.clips.count }
      expect(response.status).to eq(403)
    end
  end

  describe "POST /playlists/:id/favorite" do
    it "favoriteできる" do
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
      expect {
        post favorite_playlist_path(@other_playlist.slug),
        headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      }.to change { @current_user.fav_playlists.count }.by(1)
      expect(response.status).to eq(201)
    end
  end

  describe "DELETE /playlists/:id/favorite" do
    it "unfavoriteできる" do
      @other_playlist = FactoryBot.create(:playlist, :other_playlist)
      @current_user.favorite(@other_playlist)
      expect {
        delete favorite_playlist_path(@other_playlist.slug),
        headers: { "userAccessDigest": @current_user.convert_digest, "userId": @current_user.id }
      }.to change { @current_user.fav_playlists.count }.by(-1)
      expect(response.status).to eq(204)
    end
  end
end
