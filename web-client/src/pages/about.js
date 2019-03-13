import React, { Component } from 'react'

var data =
{
	client: {
		host: "http://localhost:8081"
	},
	server: {
		current_time: Math.trunc(Date.now() / 1000),
		services: [{
			name: "Built-ins",
			actions: [
				{
					name: "Intervalle",
					description: "Execute the action within an intervalle each minutes or hours"
				}
			],
			reactions: [
				{
					name: "Mail to yourself",
					description: "The server is in charge of sending a mail to your mail address"
				}, {
					name: "The Easter Egg",
					description: "A hidden feature, try it out"
				}
			]
		}, {
			name: "Google",
			reactions: [
				{
					name: "Add calendar event",
					description: "Add an event to your calendar with a given name, duration, and time"
				}, {
					name: "Add text file to drive",
					description: "Create a file at the root of your drive with the text given in parameter"
				}, {
					name: "Mail to yourself",
					description: "Send yourself a mail with your own mail address"
				}, {
					name: "Send a mail",
					description: "Send someone a mail"
				}
			]
		}, {
			name: "Youtube",
			actions: [
				{
					name: "New video from channel",
					description: "Execute when a new video appears on a Youtube channel"
				}
			],
			reactions: [
				{
					name: "Add video to playlist",
					description: "Add the video you want to your watch later youtube playlist"
				}
			]
		}, {
			name: "Giphy",
			actions: [
				{
					name: "New trending gif",
					description: "Execute when a new trending gif is elected from the giphy community"
				}, {
					name: "New gif based on keyword",
					description: "Execute when a new gif is posted with a specific keyword"
				}
			]
		}, {
			name: "Date & Time",
			actions: [
				{
					name: "Every day at given hour",
					description: "Execute every day at a specific hour"
				}, {
					name: "Every hour at given minute",
					description: "Execute every hour at a specific minute"
				}
			],
			reactions: [
				{
					name: "Add video to playlist",
					description: "Add the video you want to your watch later youtube playlist"
				}
			]
		}, {
			name: "New York Times",
			actions: [
				{
					name: "New Article",
					description: "Execute when a new article is posted at the New York Times"
				}, {
					name: "New bestseller book",
					description: "Execute whenever a book becomes a bestseller"
				}
			]
		}, {
			name: "Weather",
			actions: [
				{
					name: "Weather 5 next days",
					description: "Forecast 1 to 5 days and prevent a specific weather"
				}, {
					name: "Temperature exceed threshold",
					description: "Whenever the current temperature exceed a given threshold"
				}
			]
		}]
	}
}

export default class AboutJson extends Component {

	render() {
		return (
			<div>
				<pre>{JSON.stringify(data, null, 2) }</pre>
			</div>
		)
	}
}
