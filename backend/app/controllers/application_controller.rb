class ApplicationController < ActionController::API
  include HttpDealer

  # 認証：userIdとuserAccessDigestの組が正しいときに、@current_userを作成
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

  # 認可：@current_userが存在しないときに、Unauthorizedを返す
  def authorized
    render status: :unauthorized, json: { error: "Unauthorized" } if !@current_user
  end

  # ログインユーザーとプレイリストの保持者が同じ人物かを確かめる
  def correct_user(playlist)
    render status: :forbidden, json: { error: "Forbidden" } unless @current_user == playlist.user
  end
end
