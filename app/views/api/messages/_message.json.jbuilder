json.content message.content
json.createdAt message.created_at
json.chatroomId message.chatroom_id

json.user do
  json.partial! 'api/users/user', user: message.user
end
