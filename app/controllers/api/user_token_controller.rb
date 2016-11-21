class Api::UserTokenController < Knock::AuthTokenController
  private
  # Private: sets Knock's internal methods to use "User" instead of Api::User
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - initial implementation
  def entity_name
    "User"
  end
end
