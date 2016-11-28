json.messages do
  json.array! @messages.each do |message|
    json.partial! 'api/messages/message', message: message
  end
end
