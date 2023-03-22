<script setup lang="ts">
import { computed } from 'vue'

type TButtonType = 'download' | 'delete'

interface IProps {
  type?: TButtonType;
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'download',
  disabled: false
})

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (event: 'click'): void
}>()

const buttonClass = computed(() => {
  return [
    {
      'base-button_download': props.type === 'download',
      'base-button_delete': props.type === 'delete',
      'base-button_disabled': props.disabled
    }
  ]
})

function onClick (): void {
  emits('click')
}

</script>

<template>
  <button
    class="base-button"
    :class="buttonClass"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>

.base-button {
  height: 31px;
  min-width: 114px;
  padding: 7px;
  border: 1px solid;
  border-radius: 8px;

  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  &:not(:disabled):hover {
    transform: scale(1.01);
  }

  &:not(:disabled):active {
    transform: none;
  }

  &_download {
    border-color: $blue;
    color: $blue;
  }

  &_delete {
    border-color: $red;
    color: $red;
  }
  &:disabled {
    border-color: $grey;
    color: $grey;
    cursor: not-allowed;
  }
}
</style>
