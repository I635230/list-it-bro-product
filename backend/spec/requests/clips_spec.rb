require "rails_helper"

RSpec.describe "Clips", type: :request do
  describe "GET /clips" do
    before do
      @broadcaster = FactoryBot.create(:broadcaster, :tokikaze)
      @game = FactoryBot.create(:game, :lol)
      @clip = FactoryBot.create(:clip, :tokikaze_top_clip)
    end

    it "clipの一覧を取得できる" do
      get clips_path
      data = JSON.parse(response.body)
      expect(data["meta"]["elementsCount"]).to be >= 1
      expect(response.status).to eq(200)
    end

    it "titleで検索ができる" do
      get clips_path, params: { title: "葛葉" }
      data = JSON.parse(response.body)
      data["clips"].each do |clip|
        expect(clip["title"]).to include("葛葉")
      end
    end

    it "broadcasterのdisplay_nameで検索できる" do
      get clips_path, params: { broadcaster: @broadcaster.display_name }
      data = JSON.parse(response.body)
      data["clips"].each do |clip|
        expect(clip["broadcaster_name"]).to eq(@broadcaster.display_name)
      end
    end

    it "gameのnameで検索できる" do
      get clips_path, params: { game: @game.name }
      data = JSON.parse(response.body)
      data["clips"].each do |clip|
        expect(clip["game_name"]).to eq(@game.name)
      end
    end
  end

  describe "GET /clips/:id" do
    before do
      FactoryBot.create(:broadcaster, :tokikaze)
      FactoryBot.create(:game, :lol)
      @clip = FactoryBot.create(:clip, :tokikaze_top_clip)
    end

    it "clipを取得できる" do
      get clip_path(@clip.slug)
      data = JSON.parse(response.body)
      expect(data["slug"]).to eq(@clip.slug)
      expect(response.status).to eq(200)
    end
  end

  describe "POST /clips" do
    it "clipを作成できる" do
      FactoryBot.create(:game, :undefined)
      @broadcaster = FactoryBot.create(:broadcaster, :tokikaze)
      expect {
        post clips_path, params: { broadcaster_id: @broadcaster.id }
      }.to change(Clip, :count)
      expect(response.status).to eq(201)
    end
  end
end
