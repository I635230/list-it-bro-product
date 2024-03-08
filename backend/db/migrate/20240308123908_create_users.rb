class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: false do |t|
      t.column :id, 'BIGINT PRIMARY KEY'
      t.string :login
      t.string :display_name
      t.string :profile_image_url
      t.string :user_access_token
      t.string :refresh_token

      t.timestamps
    end
  end
end
