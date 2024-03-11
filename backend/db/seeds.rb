def request_get(header, uri)
  res = HTTP[header].get(uri)
  JSON.parse(res.to_s)
end

def request_post(header, uri, body)
  res = HTTP[header].get(uri, json: body)
  JSON.parse(res.to_s)
end

# GameにUndefinedを設定
Game.create!(id: 0, name: "Undefined")
