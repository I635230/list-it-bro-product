require "rails_helper"

RSpec.describe "Games", type: :system do
  before do
    driven_by(:rack_test)
  end

  describe "#index" do
    it "Gameの一覧を取得できる" do
      visit games_path
      expect(page.status_code).to eq(200)
    end
  end
end
