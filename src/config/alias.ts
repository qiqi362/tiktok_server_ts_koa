import path from 'path'
import moduleAlias from 'module-alias'
moduleAlias.addAliases({
  '@/server': path.resolve(__dirname, '..', 'server'),
  '@/router': path.resolve(__dirname, '..', 'router'),
})

moduleAlias()