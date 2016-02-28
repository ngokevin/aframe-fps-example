AFRAME.registerComponent('spawner', {
  schema: {
    on: { default: 'click' },
    mixin: { default: '' }
  },

  /**
   * Update event listener.
   */
  update: function (oldData) {
    var el = this.el;
    var spawn = this.spawn.bind(this);

    if (oldData && oldData.on === this.data.on) { return; }
    if (oldData) {
      el.removeEventListener(oldData.on, spawn);
    }

    el.addEventListener(this.data.on, spawn);
  },

  /**
   * Spawn new entity at entity's current position.
   */
  spawn: function () {
    var el = this.el;
    var entity = document.createElement('a-entity');
    var matrixWorld = el.object3D.matrixWorld;
    var position = new THREE.Vector3();
    var rotation = this.el.getAttribute('rotation');

    position.setFromMatrixPosition(matrixWorld);
    entity.setAttribute('position', position);
    rotation.x += 90;
    entity.setAttribute('rotation', rotation);
    entity.setAttribute('mixin', this.data.mixin);
    el.sceneEl.appendChild(entity);
    entity.play();
  }
});
