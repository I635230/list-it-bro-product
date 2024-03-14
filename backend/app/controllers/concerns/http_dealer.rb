module HttpDealer
  def request_get(header, uri)
    res = HTTP[header].get(uri)
    JSON.parse(res.to_s)
  end

  def get_status(header, uri)
    res = HTTP[header].get(uri)
    res.status
  end

  def request_post(header, uri, body)
    res = HTTP[header].post(uri, form: body)
    JSON.parse(res.to_s)
  end
end
