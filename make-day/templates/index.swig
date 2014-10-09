{% extends '[POSITION]layout/club.html' %}

{% block pageTitle %}{% endblock %}

{% block content %}
<div class="row">
	<h2>[BAND][COUNTRY]</h2>
	<p>[TIME] [DAYNAME] [DAY]/<a href="{{ siteUrl }}/[URL]" class="tiny button secondary">[MONTH]</a></p>
</div>
{% include '[POSITION2]partials/artists/[SLUG].html' %}
{% endblock %}