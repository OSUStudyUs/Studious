class Api::MessagesController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_proper_permission!

  def index
    @chatroom ||= Chatroom.find params[:chatroom_id]
    @messages = @chatroom.messages

    render :index, status: 200
  end

  private
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/28/16 - Kyle Thompson - initial implementation
  def ensure_proper_permission!
    @chatroom = Chatroom.find params[:chatroom_id]

    user = @chatroom.user
    study_group = @chatroom.study_group

    unless current_user == user || study_group&.has_member?(current_user)
      head 401
    end
  end
end
