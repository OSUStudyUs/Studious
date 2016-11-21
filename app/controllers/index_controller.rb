class IndexController < ApplicationController
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/17/16 - Kyle Thompson - initial implementation
  def index
    render file: File.join(Rails.root, "public", "index.html")
  end
end
