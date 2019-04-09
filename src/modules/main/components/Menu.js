import React from 'react';
import _ from 'lodash';
import { View, Text, Icon } from '../../common/components';
import { MainItem } from './';
import { MenuItemType, MenuProps } from '../types/Main';

const items: Array<MenuItemType> = [
  {
    icon: 'zub',
    text: 'Бонусы',
    scene: 'BonusContainer',
  },
  {
    icon: 'akcii',
    text: 'Акции',
    scene: 'PromotionsContainer',
  },
  {
    icon: 'uslugi',
    text: 'Услуги',
    scene: 'ServiceListContainer',
  },
  {
    icon: 'marker',
    text: 'Контакты',
    scene: 'ContactsContainer',
  },
  {
    icon: 'o-nas',
    text: 'О нас',
    scene: 'AboutUsContainer',
  },
  {
    icon: 'mail',
    text: 'Обратная связь',
    scene: 'FeedbackContainer',
  },
  {
    icon: 'settings',
    text: 'Настройки',
    scene: 'SettingsContainer',
  },
  {
    icon: 'telephone',
    text: 'Срочная\nконсультация',
    scene: 'Consultation',
    isModal: true,
  },
];

export default function Menu(props: MenuProps) {
  return _.map(items, (item: MenuItemType, i: number): React.ComponentType => {
    if (i % 2 === 1) {
      return null;
    }
    const item2: MenuItemType = items[i + 1];
    const isFirst: boolean = i === 0;
    const isLast: boolean = i === items.length - 2;
    return (<View
      flexRow
      key={i}
    >
      <MainItem
        width50
        rightUp={isFirst}
        rightVertical={!isFirst && !isLast}
        rightDown={isLast}
        bottomLeft={!isLast}
        onPress={props.onPressItem(item)}
        btnStyle={props.style.menuLeftBtn}
      >
        <Icon name={item.icon} white />
        <Text pushTopSmall white textCenter>{item.text}</Text>
      </MainItem>
      <MainItem
        width50
        bottomRight={!isLast}
        onPress={props.onPressItem(item2)}
        btnStyle={props.style.menuRightBtn}
      >
        <Icon name={item2.icon} />
        <Text pushTopSmall white textCenter>{item2.text}</Text>
      </MainItem>
    </View>);
  });
}
