# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_03_08_124059) do
  create_table "broadcasters", id: :bigint, default: nil, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "login"
    t.string "display_name"
    t.string "profile_image_url"
    t.string "language"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["display_name"], name: "index_broadcasters_on_display_name"
  end

  create_table "clips", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "slug"
    t.bigint "broadcaster_id", null: false
    t.string "broadcaster_name"
    t.integer "creator_id"
    t.string "creator_name"
    t.bigint "game_id", null: false
    t.string "language"
    t.string "title"
    t.datetime "clip_created_at"
    t.string "thumbnail_url"
    t.float "duration"
    t.integer "view_count"
    t.string "search_keywords"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["broadcaster_id"], name: "index_clips_on_broadcaster_id"
    t.index ["clip_created_at"], name: "index_clips_on_clip_created_at"
    t.index ["game_id"], name: "index_clips_on_game_id"
    t.index ["search_keywords"], name: "index_clips_on_search_keywords"
    t.index ["slug"], name: "index_clips_on_slug"
    t.index ["title"], name: "index_clips_on_title"
    t.index ["view_count"], name: "index_clips_on_view_count"
  end

  create_table "favorites", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "playlist_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id", "user_id"], name: "index_favorites_on_playlist_id_and_user_id", unique: true
    t.index ["playlist_id"], name: "index_favorites_on_playlist_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "games", id: :bigint, default: nil, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "box_art_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_games_on_name"
  end

  create_table "playlist_clips", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "playlist_id", null: false
    t.bigint "clip_id", null: false
    t.integer "order", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clip_id"], name: "index_playlist_clips_on_clip_id"
    t.index ["playlist_id", "clip_id"], name: "index_playlist_clips_on_playlist_id_and_clip_id", unique: true
    t.index ["playlist_id"], name: "index_playlist_clips_on_playlist_id"
  end

  create_table "playlists", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "slug"
    t.string "title"
    t.bigint "user_id", null: false
    t.string "search_keywords"
    t.boolean "public", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_playlists_on_created_at"
    t.index ["search_keywords"], name: "index_playlists_on_search_keywords"
    t.index ["slug"], name: "index_playlists_on_slug"
    t.index ["title"], name: "index_playlists_on_title"
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "users", id: :bigint, default: nil, charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "login"
    t.string "display_name"
    t.string "profile_image_url"
    t.string "user_access_token"
    t.string "refresh_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["display_name"], name: "index_users_on_display_name"
  end

  add_foreign_key "clips", "broadcasters"
  add_foreign_key "clips", "games"
  add_foreign_key "favorites", "playlists"
  add_foreign_key "favorites", "users"
  add_foreign_key "playlist_clips", "clips"
  add_foreign_key "playlist_clips", "playlists"
  add_foreign_key "playlists", "users"
end
