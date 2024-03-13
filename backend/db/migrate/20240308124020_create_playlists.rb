class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :slug, unique: true, index: true
      t.string :title, index: true
      t.references :user, null: false, foreign_key: true
      t.string :search_keywords, index: true

      t.timestamps
    end
  end
end
