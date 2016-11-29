class ChatChannel < ApplicationCable::Channel
  # Public: allows a client to subscribe to messages for a chatroom
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/28/16 - Kyle Thompson - initial implementation
  #   2: 11/28/16 - Alex Tareshawty - render json string of message
  def subscribed
    @chatroom = Chatroom.find params[:chatroom_id]
    stream_for @chatroom, coder: ActiveSupport::JSON do |message|
      message = Message.includes(:user).find(message['id'])
      transmit Api::MessagesController.render(partial: 'api/messages/message', locals: { message: message })
    end
  end

  # Public: persists a message to the DB and broadcasts it to the channel
  #
  # Author: Kyle Thompson
  # Revisions:
  #   1: 11/28/16 - Kyle Thompson - initial implementation
  #   2: 11/28/16 - Alex Tareshawty - update things to suit my needs
  def send_message(data)
    message = current_user.messages.create!(content: data["content"], chatroom_id: @chatroom.id)
    ChatChannel.broadcast_to @chatroom, message
  end
end
