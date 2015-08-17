var Base_URL = '/api/shootingtracker?year=2015';

export var TrackerModel = Backbone.Model.extend({
  urlRoot: Base_URL,
  initialize: function(){}
});

export var TrackerCollection = Backbone.Collection.extend({
  model: TrackerModel,
  url: Base_URL,
  intialize: function(){}
});
