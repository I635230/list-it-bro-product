class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :slug, unique: true
      t.string :title
      t.references :user, null: false, foreign_key: true
      t.string :search_keywords

      t.timestamps
    end
  end
end
