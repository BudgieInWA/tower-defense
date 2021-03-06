import Ember from 'ember';

////////////////
//            //
//   Basics   //
//            //
////////////////

const ToolTipComponent = Ember.Component.extend({
  classNameBindings: ['atTop:tool-tip--below:tool-tip--above'],

  classNames: ['tool-tip'],

  atTop: null,

  updateAtTop: Ember.on('didInsertElement', function () {
    const atTop = this.$().offset().top < 100;
    this.set('atTop', atTop);
  }),

  keepTowerToolTipsOnScreen: Ember.on('didInsertElement', Ember.observer('atTop', function () {
    const windowWidth = Ember.$(window).width();
    const offsetLeft = this.$().offset  ().left;
    const textOuterWidth = this.$('nobr').outerWidth();
    const offsetLeftPlusOuterWidth = offsetLeft + textOuterWidth;
    const offsetRight = windowWidth - offsetLeftPlusOuterWidth;
    const atRight = offsetRight < 0;

    if (this.attrs.type === 'tower' && atRight) {
      Ember.run.schedule('afterRender', this, () => {
        this.$('.tool-tip__content').css('margin-left', `${offsetRight}px`);
      });
    }
  }))
});

export default ToolTipComponent;
