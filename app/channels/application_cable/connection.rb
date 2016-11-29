module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    protected

    # Protected: finds the verified user with the provided JWT
    #
    # Author: Kyle Thompson
    # Revisions:
    #   1: 11/28/16 - Kyle Thompson - initial implementation
    def find_verified_user
      token = request.url.split("sockets").last.gsub("/", "")

      begin
        decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, { :leeway => 30, :algorithm => 'HS256' }) unless token.nil?
      rescue
        return reject_unauthorized_connection
      end

      if decoded_token.nil?
        reject_unauthorized_connection
      else
        User.from_token_payload(decoded_token[0]) || reject_unauthorized_connection
      end
    end
  end
end
