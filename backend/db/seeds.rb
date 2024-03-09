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

# broadcaster作成
Broadcaster.create!(id: 807966915, login: "tokikaze_ch", display_name: "時風まゆら")
