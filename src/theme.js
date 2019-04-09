import _ from 'lodash';
import globalTheme from './modules/common/theme/Global';
import buttonTheme from './modules/common/theme/Button';
import textTheme from './modules/common/theme/Text';
import iconTheme from './modules/common/theme/Icon';
import containerTheme from './modules/common/theme/Container';
import contentTheme from './modules/common/theme/Content';
import itemTheme from './modules/common/theme/Item';
import inputTheme from './modules/common/theme/Input';
import viewTheme from './modules/common/theme/View';
import headerTheme from './modules/common/theme/Header';
import leftTheme from './modules/common/theme/Left';
import bodyTheme from './modules/common/theme/Body';
import rightTheme from './modules/common/theme/Right';
import logoTheme from './modules/common/theme/Logo';
import touchableTheme from './modules/common/theme/Touchable';
import titleTheme from './modules/common/theme/Title';
import cardTheme from './modules/common/theme/Card';
import itemRadioTheme from './modules/common/theme/ItemRadio';
import itemCalendarTheme from './modules/common/theme/ItemCalendar';
import itemTimeTheme from './modules/common/theme/ItemTime';
import switchTheme from './modules/common/theme/Switch';

import mainTheme from './modules/main/theme/Main';
import mainItemTheme from './modules/main/theme/MainItem';
import material from '../node_modules/native-base/dist/src/theme/variables/material';

export default (variables: {} = material): {} => {
  variables = {
    ...material,
    ...variables,
  };
  let theme = {
    variables,
    'NativeBase.Button': {
      ...buttonTheme(variables),
    },
    'NativeBase.Text': {
      ...textTheme(variables),
    },
    'NativeBase.Icon': {
      ...iconTheme(variables),
    },
    'NativeBase.IconNB': {
      ...iconTheme(variables),
    },
    'NativeBase.Container': {
      ...containerTheme(variables),
    },
    'NativeBase.Content': {
      ...contentTheme(variables),
    },
    'NativeBase.Item': {
      ...itemTheme(variables),
    },
    'NativeBase.Input': {
      ...inputTheme(variables),
    },
    'NativeBase.Textarea': {
      ...inputTheme(variables),
    },
    'NativeBase.View': {
      ...viewTheme(variables),
    },
    'NativeBase.ViewNB': {
      ...viewTheme(variables),
    },
    'NativeBase.Header': {
      ...headerTheme(variables),
    },
    'NativeBase.Left': {
      ...leftTheme(variables),
    },
    'NativeBase.Body': {
      ...bodyTheme(variables),
    },
    'NativeBase.Right': {
      ...rightTheme(variables),
    },
    'NativeBase.Logo': {
      ...logoTheme(variables),
    },
    'NativeBase.Touchable': {
      ...touchableTheme(variables),
    },
    'NativeBase.Title': {
      ...titleTheme(variables),
    },
    'NativeBase.Card': {
      ...cardTheme(variables),
    },
    'NativeBase.ItemRadio': {
      ...itemRadioTheme(variables),
    },
    'NativeBase.ItemCalendar': {
      ...itemCalendarTheme(variables),
    },
    'NativeBase.ItemTime': {
      ...itemTimeTheme(variables),
    },
    'NativeBase.Switch': {
      ...switchTheme(variables),
    },


    'NativeBase.Main': {
      ...mainTheme(variables),
    },
    'NativeBase.MainItem': {
      ...mainItemTheme(variables),
    },
  };

  theme = _.mapValues(theme, item => ({
    ...item,
    ...globalTheme(variables),
  }));

  const cssifyTheme = (grandparent: {}, parent: {}, parentKey: string): {} => {
    _.forEach(parent, (style, styleName) => {
      // console.log('styleName', styleName);
      // console.log('parentKey', parentKey);
      if (
        styleName.indexOf('.') === 0 &&
        parentKey &&
        parentKey.indexOf('.') === 0
      ) {
        if (grandparent) {
          if (!grandparent[styleName]) {
            grandparent[styleName] = {};
          } else {
            grandparent[styleName][parentKey] = style;
          }
        }
      }
      if (style && typeof style === 'object') {
        cssifyTheme(parent, style, styleName);
      }
    });
  };

  cssifyTheme(null, theme, null);

  return theme;
};
