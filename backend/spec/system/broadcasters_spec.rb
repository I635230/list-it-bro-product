require "rails_helper"

RSpec.describe "Broadcasters", type: :system do
  before do
    driven_by(:rack_test)
  end

  describe "#index" do
    it "broadcastersの一覧を取得できる" do
      visit broadcasters_path
      expect(page.status_code).to eq(200)
    end
  end

  describe "#create" do
    it "broadcaster_idからBroadcasterを作成できる" do
      expect {
        post broadcasters_path, params: { broadcaster_id: 807966915 }
      }.to change(Broadcaster, :count).by(1)
    end

    it "clip_idからBroadcasterを作成できる" do
      expect {
        post broadcasters_path, params: { clip_id: "RepleteBitterCormorantUWot-tyks4HB68CU1J7Kc" }
      }.to change(Broadcaster, :count).by(1)
    end
  end
end
