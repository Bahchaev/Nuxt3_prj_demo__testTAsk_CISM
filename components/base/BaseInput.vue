<script setup lang="ts">
import { PropType, ref } from 'vue'

type TInput = 'text'

interface IProps {
  modelValue: PropType<string | null> | string | null;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: TInput;
  name: string;
  readonly?: boolean
}

withDefaults(defineProps<IProps>(), {
  label: '',
  disabled: false,
  placeholder: '',
  type: 'text',
  readonly: false
})

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'submit'): void
  (event: 'focus'): void
  (event: 'blur'): void
  (event: 'keydown', $event: Event): void
  (event: 'enter'): void
}>()

const refs = ref(null)

const onFocus = ref(false)

function input ({ target }: { target: HTMLInputElement }): void {
  const { value } = target
  emits('update:modelValue', value)
}

function focus (): void {
  onFocus.value = true
  emits('focus')
}

function focusout (): void {
  onFocus.value = false
  if (refs.value === null) {
    return
  }
  const input = refs.value as HTMLInputElement
  emits('blur')
  input.blur()
}

function keydown (event: Event): void {
  emits('keydown', event)
}

function keydownEnter (): void {
  emits('enter')
}

</script>

<template>
  <div
    class="base-input"
    @keydown="keydown"
  >
    <label
      v-if="label"
      class="base-input__label"
    >
      {{ label }}
    </label>

    <input
      ref="refs"
      :value="modelValue"
      autocomplete="none"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      class="base-input__input"
      :readonly="readonly"
      @keydown.esc="focusout"
      @blur="focusout"
      @input="input"
      @focus="focus"
      @keydown.enter="keydownEnter"
    >
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  display: flex;
  flex-direction: column;

  &__label {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    margin-bottom: 14px;
  }

  &__input {
    padding: 16px 24px;
    border: 1.5px solid #E9ECEF;
    border-radius: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    &::placeholder {
      color: $grey
    }
  }
}
</style>
