class CreateClips < ActiveRecord::Migration[7.0]
  def change
    create_table :clips do |t|
      t.string :slug, unique: true, index: true
      t.references :broadcaster, null: false, foreign_key: true
      t.string :broadcaster_name
      t.integer :creator_id
      t.string :creator_name
      t.references :game, null: false, foreign_key: true
      t.string :language
      t.string :title, index: true
      t.datetime :clip_created_at, index: true
      t.string :thumbnail_url
      t.float :duration
      t.integer :view_count, index: true
      t.string :search_keywords, index: true
      t.integer :order, null: false, default: 1

      t.timestamps
    end
    # add_index(:clips, :created_at)
  end
end
