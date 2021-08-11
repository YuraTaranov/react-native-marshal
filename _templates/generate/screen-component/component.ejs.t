---
to: src/screens/<%=folder%>/components/<%=h.changeCase.pascal(name)%>/<%=h.changeCase.pascal(name)%>.tsx
---
import React from 'react';
import {useCallback, useMemo, useTranslation, useState} from '@hooks';
import {View, Text} from '@components';
import styles from './styles';
import { connect } from 'react-redux';

type TProps = {};

const <%=h.changeCase.pascal(name)%>: React.FC<TProps> = ({}) => {
    const {t} = useTranslation();

	return <View style={styles.container}></View>;
	};

	export default <%=h.changeCase.pascal(name)%>;

