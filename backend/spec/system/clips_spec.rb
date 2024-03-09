require "rails_helper"

RSpec.describe "Clips", type: :system do
  before do
    driven_by(:rack_test)
  end

  describe "#index" do
    it "clipの一覧を取得できる" do
      visit clips_path
      expect(page.status_code).to eq(200)
    end
  end

  describe "#show" do
    it "clipを取得できる" do
      FactoryBot.create(:broadcaster, :tokikaze)
      FactoryBot.create(:game, :lol)
      @clip = FactoryBot.create(:clip, :tokikaze_top_clip)
      visit clip_path(@clip.slug)
      expect(page.status_code).to eq(200)
    end
  end

  describe "#create_many" do
    it "clipsを作成できる" do
      FactoryBot.create(:game, :undefined)
      @broadcaster = FactoryBot.create(:broadcaster, :tokikaze)
      expect {
        post clips_path, params: { broadcaster_id: @broadcaster.id }
      }.to change(Clip, :count)
    end
  end
end
