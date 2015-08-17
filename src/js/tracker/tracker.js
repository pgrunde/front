import {TrackerModel, TrackerCollection} from '../tracker/model.js'


export var TrackerTable = Backbone.View.extend({
  template: _.template(`
<div class="main-content">
  <table class="table">
    <tbody>
      <tr><td colspan="99">No results</td></tr>
    </tbody>
  </table>
</div>`),
  initialize: function() {
    this.render();

    this.collection = new TrackerCollection();
    this.listenTo(this.collection, 'all', this.renderBody);
    this.collection.fetch({reset: true});
  },
  render: function() {
    this.$el.html(this.template({}));
    this.$tbody = this.$('tbody');
  },
  renderBody: function() {
    this.$tbody.empty();
    if (this.collection.length === 0) {
      this.$tbody.html(`<tr><td colspan="99"><i>No Results</i></td></tr>`);
      return
    }
    this.collection.each(this.renderOne, this)
  },
  renderOne: function(model) {
    this.$tbody.append((new TrackerRow({model: model})).render().el);
  }
});

export var TrackerRow = Backbone.View.extend({
  tagName: 'tr',
  template: _.template(`
<td><%- number %></td>
<td><%- date %></td>
<td><%- killed %></td>
<td><%- wounded %></td>
<td><%- city %>, <%- state %></td>`),
  initialize: function() {},
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
