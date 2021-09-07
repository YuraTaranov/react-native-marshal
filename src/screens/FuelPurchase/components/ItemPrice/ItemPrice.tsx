import React from 'react';
import {View, Text, TouchableOpacity} from '@components';
import {useEffect, useState, useTranslation} from '@hooks';
import styles from './styles';

//Type
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {TPrice} from '@types';

type TProps = TPrice & {
  onSelected: (id: number) => void;
  selectedId: number | null;
};

export const ItemPrice: React.FC<TProps> = ({
  cost,
  id,
  onSelected,
  selectedId,
  title,
}) => {
  const {t} = useTranslation();
  const [selected, setSelected] = useState(false);
  const onPress = () => {
    onSelected(id);
    setSelected(true);
  };

  useEffect(() => {
    if (id === selectedId && !selected) {
      setSelected(true);
    }
    if (id !== selectedId && selected) {
      setSelected(false);
    }
  }, [selectedId, selected, id]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.itemPrice, selected && styles.selected]}>
        <Text style={[styles.title, selected && styles.titleSelected]}>
          {title}
        </Text>
        <Text style={[styles.cost, selected && styles.costSelected]}>
          {`${cost} ${t('currency')}/${t('l')}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
