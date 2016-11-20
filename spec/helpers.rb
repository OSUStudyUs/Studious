module Helpers
  def auth_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.email }).token

    {
      'Authorization': "Bearer #{token}"
    }
  end
end
