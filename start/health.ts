import { HealthChecks, DiskSpaceCheck, MemoryHeapCheck } from '@adonisjs/core/health'
import { DbConnectionCountCheck } from '@adonisjs/lucid/database'
import db from '@adonisjs/lucid/services/db'

export const healthChecks = new HealthChecks().register([
  new DiskSpaceCheck().warnWhenExceeds(80).failWhenExceeds(90),
  new MemoryHeapCheck().warnWhenExceeds('300 mb').failWhenExceeds('700 mb'),
  new DbConnectionCountCheck(db.connection()),
])
