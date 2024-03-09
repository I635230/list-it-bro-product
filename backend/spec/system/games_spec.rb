require "rails_helper"

RSpec.describe "Games", type: :system do
  before do
    driven_by(:rack_test)
  end

  it "Gameの一覧を取得できる" do
    visit games_path
    expect(page.status_code).to eq(200)
  end
end
