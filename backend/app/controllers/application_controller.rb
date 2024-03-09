class ApplicationController < ActionController::API
  include HttpDealer

  # 認証：digestが存在するとき、user_idを取得
  def certificated
    if user_id = request.headers["userId"]
      digest = request.headers["userAccessDigest"]
      user = User.find_by(id: user_id)

      # digestの情報が正しいかを確認
      if user.authenticated?(digest)
        @current_user = user
      end
    end
  end
end
