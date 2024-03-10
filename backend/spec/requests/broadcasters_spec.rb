require "rails_helper"

RSpec.describe "Broadcasters", type: :request do
  describe "GET /broadcasters" do
    it "broadcasterの一覧を取得できる" do
      @broadcaster = FactoryBot.create(:broadcaster, :tokikaze)
      get broadcasters_path
      data = JSON.parse(response.body)
      expect(data).to include(@broadcaster.display_name)
      expect(response.status).to eq(200)
    end
  end

  describe "POST /broadcasters" do
    it "broadcaster_idからbroadcasterを作成できる" do
      expect {
        post broadcasters_path, params: { broadcaster_id: 807966915 }
      }.to change(Broadcaster, :count).by(1)
      expect(response.status).to eq(201)
    end

    it "clip_idからbroadcasterを作成できる" do
      expect {
        post broadcasters_path, params: { clip_id: "RepleteBitterCormorantUWot-tyks4HB68CU1J7Kc" }
      }.to change(Broadcaster, :count).by(1)
      expect(response.status).to eq(201)
    end
  end
end
