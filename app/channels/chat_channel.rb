class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chatroom = Chatroom.find params[:chatroom_id]
    stream_for @chatroom, coder: ActiveSupport::JSON
  end

  def send_message(data)
    message = current_user.messages.create!(content: data["content"], chatroom_id: data["chatroomId"])
    broadcast_to @chatroom, message
  end
end
