import * as React from 'react'
import { Profiler } from '../../modules/profiler'

export const ProfileContext = React.createContext(new Profiler())
