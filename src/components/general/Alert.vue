<template>
  <div class="p-4 my-10 border rounded-md" :class="selectedStyle.borderColor">
    <div class="flex items-center mb-4 gap-x-2">
      <Icon :class="selectedStyle.textColor" tag="span" size="24px">
        <component :is="selectedIcon" />
      </Icon>
      <h4 class="text-lg font-medium" :class="selectedStyle.textColor">
        {{ selectedStyle.title }}
      </h4>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { Info24Regular } from '@vicons/fluent';
import { SmsFailedOutlined } from '@vicons/material';
import { Icon } from '@vicons/utils';

const props = defineProps({
  alertStyle: {
    type: String,
    required: true,
  }
});

const icons = {
  SmsFailedOutlined,
  Info24Regular
};

const styles = {
  warning: {
    title: "Warning",
    borderColor: "border-yellow-600",
    textColor: "text-yellow-600",
    icon: "SmsFailedOutlined"
  },
  note: {
    title: "Note",
    borderColor: "border-main",
    textColor: "text-main",
    icon: "Info24Regular"
  },
};

const selectedStyle = styles[props.alertStyle] || styles.warning;
const selectedIcon = icons[selectedStyle.icon];
</script>