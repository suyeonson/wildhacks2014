require 'rubygems'
require 'sinatra'
require 'json'
require "./lib/pocket.rb"

enable :sessions

set :views, File.dirname(__FILE__) + '/views'
set :public_folder, File.dirname(__FILE__) + '/public'

#CALLBACK_URL = "http://localhost:4567/oauth/callback"

CALLBACK_URL = "https://pickpocket.herokuapp.com/oauth/callback"

Pocket.configure do |config|
  config.consumer_key = '34879-eb9f9f3af8b2b02555565921'
end

get '/reset' do
  puts "GET /reset"
  session.clear
end

get "/" do
  puts "GET /"
  puts "session: #{session}"

  if session[:access_token]
    erb :index
#     '
# <a href="/add?url=http://getpocket.com">Add Pocket Homepage</a>
# <a href="/retrieve">Retrieve single item</a>
#     '
  else
    erb :login
    
  end
end

get "/oauth/connect" do
  puts "OAUTH CONNECT"
  session[:code] = Pocket.get_code(:redirect_uri => CALLBACK_URL)
  new_url = Pocket.authorize_url(:code => session[:code], :redirect_uri => CALLBACK_URL)
  puts "new_url: #{new_url}"
  puts "session: #{session}"
  redirect new_url
end

get "/oauth/callback" do
  puts "OAUTH CALLBACK"
  puts "request.url: #{request.url}"
  puts "request.body: #{request.body.read}"
  result = Pocket.get_result(session[:code], :redirect_uri => CALLBACK_URL)
  session[:access_token] = result['access_token']
  puts result['access_token']
  puts result['username']	
  # Alternative method to get the access token directly
  #session[:access_token] = Pocket.get_access_token(session[:code])
  puts session[:access_token]
  puts "session: #{session}"
  redirect "/"
end

get '/add' do
  client = Pocket.client(:access_token => session[:access_token])
  info = client.add :url => 'http://getpocket.com'
  "<pre>#{info}</pre>"
end

get "/retrieve" do
  client = Pocket.client(:access_token => session[:access_token])
  info = client.retrieve(:detailType => :simple)
  #data = JSON.pretty_generate(info)
  data = info.to_json
  #saved = JSON.parse(data)["list"]
  saved = JSON.parse(data)["list"]
  @articles = []
  @titles = []
  saved.each do |item, value|
    # @titles = value["given_title"]
    @articles.push({
      "title" => value["given_title"],
      "word_count" => value["word_count"],
      "reading_time" => ((value["word_count"]).to_f / 130).round,
      "url" => value["resolved_url"]
      })
    # @articles[:article] = {
    #   "title" => value["given_title"],

    # }
    # @titles.push(value["given_title"])
    # @titles.push(value["word_count"])
    #p @titles
  end

  erb :saved, :locals => {:articles => @articles}

  # @titles.each do |title, word_count|
  #    "#{title}, #{word_count}\n"
  # end
  # @titles.each do |title|
  #   "<pre>#{title}</pre>"
  # end
  # puts data
  # for item in info
  #   "<ul>#{info.list.given_title}</ul>"
  # end

  # html = "<h1>#{user.username}'s recent photos</h1>"
  # for media_item in client.user_recent_media
  #   html << "<img src='#{media_item.images.thumbnail.url}'>"
  # end
  # html
  # data = JSON.parse(info)
  #puts JSON.pretty_generate(info)
  #"<pre>#{saved}</pre>"
end
