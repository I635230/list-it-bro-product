# Rails.rootを使用するために必要。config/environment.rbを取り込む。
# 記載しないとNameError: uninitialized constant #<Class:#<Whenever::JobList:...>>::Railsエラーが出る。
require File.expand_path(File.dirname(__FILE__) + '/environment')

# cronを実行する環境変数。
# ENV['RAILS_ENV'] = nilの時:developmentを代入。
rails_env = ENV['RAILS_ENV'] || :development

# cronを実行する環境変数をセット
set :environment, rails_env

# ログの設定
set :output, "/log/cron.log"

# 定期実行
every 3.hours do
  begin
    runner "Batch::Clips.update_all"
  rescue
    Rails.logger.error("clipsの登録に失敗しました")
    raise e
  end

  begin
    runner "Batch::Rankings.destroy"
  rescue
    Rails.logger.error("rakingsの削除に失敗しました")
    raise e
  end

  begin
    runner "Batch::Rankings.create"
  rescue
    Rails.logger.error("rakingsの作成に失敗しました")
    raise e
  end
end


# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
