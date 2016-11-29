json.content message.content
json.createdAt message.created_at
json.chatroomId message.chatroom_id
json.id message.id

json.user do
  json.partial! 'api/messages/message_user', user: message.user
end
