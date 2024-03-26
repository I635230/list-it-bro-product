require "rails_helper"

RSpec.describe "Games", type: :request do
  describe "GET /games" do
    it "gameの一覧を取得できる" do
      @game = FactoryBot.create(:game, :lol)
      get games_path
      data = JSON.parse(response.body)
      expect(data).to include(@game.name)
      expect(response.status).to eq(200)
    end
  end
end
