---
layout: page
title: art
permalink: /art/
nav: true
nav_order: 3
---

{% assign art_images = site.static_files | where_exp: "file", "file.path contains '/art_portfolio/'" %}

<div style="columns: 3 260px; column-gap: 1.25rem; margin-top: 1rem;">
  {% for file in art_images %}
    {% assign ext = file.extname | downcase %}
    {% if ext == '.jpg' or ext == '.jpeg' or ext == '.png' or ext == '.gif' or ext == '.webp' %}
    <img src="{{ file.path | relative_url }}" alt="{{ file.basename }}" loading="lazy"
         style="width: 100%; height: auto; display: block; margin-bottom: 1.25rem; break-inside: avoid; border-radius: 4px;">
    {% endif %}
  {% endfor %}
</div>
