export default [
  {
    path: 'bar',
    name: 'bar',
    meta: {
      title: 'Bar',
      icon: '_apple'
    },
    children: [
      {
        path: 'module-a',
        name: 'module-a',
        meta: {
          title: 'ModuleA',
          icon: '_vue'
        },
        children: [
          {
            path: 'func1',
            name: 'func1',
            meta: {
              title: 'Func1',
              icon: '_android'
            }
          },
          {
            path: 'func2',
            name: 'func2',
            meta: {
              title: 'Func2',
              icon: '_app'
            }
          }
        ]
      },
      {
        path: 'module-b',
        name: 'module-b',
        meta: {
          title: 'ModuleB',
          icon: '_react'
        },
        children: [
          {
            path: 'func3',
            name: 'func3',
            meta: {
              title: 'Func3',
              icon: '_linux'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'foo',
    name: 'foo',
    meta: {
      title: 'Foo',
      icon: '_google'
    },
    children: [
      {
        path: 'module-c',
        name: 'module-c',
        meta: {
          title: 'ModuleC',
          icon: '_nodejs'
        }
      },
      {
        path: 'module-d',
        name: 'module-d',
        meta: {
          title: 'ModuleD',
          icon: '_github'
        }
      }
    ]
  }
]
