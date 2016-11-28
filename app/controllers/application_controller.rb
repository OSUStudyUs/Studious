class ApplicationController < ActionController::API
  include Knock::Authenticable
  helper_method :errors_hash_for

  # Public: formats error messages to match the Model.errors hash
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/27/16 - Kyle Thompson - initial implementation
  def errors_hash_for(class_name, error_message)
    {
      "#{class_name.to_s.underscore}": [
        error_message
      ]
    }
  end
end
