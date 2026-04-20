---
layout: page
title: art
permalink: /art/
nav: true
nav_order: 3
---

{% assign art_images = site.static_files | where_exp: "file", "file.path contains '/art_portfolio/'" %}

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-2">
  {% for file in art_images %}
    {% assign ext = file.extname | downcase %}
    {% if ext == '.jpg' or ext == '.jpeg' or ext == '.png' or ext == '.gif' or ext == '.webp' %}
    <div class="col">
      <img src="{{ file.path | relative_url }}" class="img-fluid rounded" alt="{{ file.basename }}" loading="lazy" style="width: 100%; object-fit: cover; aspect-ratio: 1;">
    </div>
    {% endif %}
  {% endfor %}
</div>
