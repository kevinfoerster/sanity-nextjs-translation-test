// @ts-check
import React from 'react'
import {Box, Text, Stack} from '@sanity/ui'
// import Schema from '@sanity/schema';
import {schema as translationSchema} from '../../schemas/schema'
import { contentTypes } from '../../schemas/documents/page';
import get from 'lodash.get'


const testData = {
    "_id": "drafts.0ac5c8c5-518e-482f-8cc9-aa33cb0e3467",
    "_type": "page",
    "title": "testpage",
    "link": {
      "_type": "internalLink",
      "label": "test label",
      "to": {
        "_type": "reference",
        "_ref": "356db831-c321-45f4-bb5f-01329b3798c3"
      }
    },
    "cta": {
      "_type": "cta",
      "title": "test cta",
      "link": "http://example.com"
    },
    "content": [
      {
        "_type": "m0016",
        "_key": "83cf9575fb6e",
        "logoLink": {
          "_type": "internalLink",
          "label": "label m0016 link",
          "to": {
            "_type": "reference",
            "_ref": "356db831-c321-45f4-bb5f-01329b3798c3"
          }
        },
        "text": "lorem ",
        "buttonText": "button text",
        "contactModule": {
          "_type": "reference",
          "_ref": "356db831-c321-45f4-bb5f-01329b3798c3"
        },
        "links": [
          {
            "_type": "m0016Links",
            "_key": "36d03ca242f1",
            "categoryLink": [
              {
                "_type": "internalLink",
                "_key": "14677af7ea1c",
                "label": "category link",
                "to": {
                  "_type": "reference",
                  "_ref": "356db831-c321-45f4-bb5f-01329b3798c3"
                }
              }
            ],
            "childLinks": [
              {
                "_type": "internalLink",
                "_key": "de8922060fb7",
                "label": "child link",
                "to": {
                  "_type": "reference",
                  "_ref": "356db831-c321-45f4-bb5f-01329b3798c3"
                }
              }
            ]
          }
        ],
        "socialMediaLogos": [
          {
            "_type": "m0016SocialMediaLogos",
            "_key": "ca99a20edbb7",
            "socialMediaLogoLink": {
              "_type": "externalLink",
              "label": "social media link",
              "target": "",
              "externalLink": "http://example.org"
            },
            "image": {
              "_type": "imageWithAlt",
              "asset": {
                "_type": "reference",
                "_ref": "image-19091fab26e0b891e261ea6e1f6f446c35106dd4-214x54-svg"
              }
            }
          }
        ],
        "legalLinks": [
          {
            "_type": "internalLink",
            "_key": "eede6db33035",
            "label": "legal link",
            "to": {
              "_type": "reference",
              "_ref": "356db831-c321-45f4-bb5f-01329b3798c3"
            }
          }
        ],
        "paymentLogos": [
          {
            "_type": "imageWithAlt",
            "_key": "8f809c7761f0",
            "asset": {
              "_type": "reference",
              "_ref": "image-19091fab26e0b891e261ea6e1f6f446c35106dd4-214x54-svg"
            }
          }
        ]
      }
    ],
    "_rev": "wurdyf-qpk-ilj-nad-jxxqi6qey",
    "_updatedAt": "2022-03-29T12:12:56.826Z"
  }
/**
 *
 * @param {any[]} array - array of elements to join
 * @param {number} endIndex - index to limit array length
 * @param {string} separator - separator to join the array with
 * @return string
 */
const joinArrayUntil = (array, endIndex, separator) => {
  if(endIndex === 0) {
    return ''
  }

  if(endIndex >= array.length - 1) {
    return array.join(separator)
  }

  return `${array.slice(0, endIndex).join(separator)}${separator}`
}

const findAllPaths = (obj, startString = '') =>
  Object.keys(obj)
    .map((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Number.isInteger(parseInt(key, 10))) {
          return findAllPaths(
            obj[key],
            `${startString.substr(0, startString.length - 1)}[${key}]`
          );
        }
        return findAllPaths(obj[key], `${startString}${key}.`);
      }
      return startString + key;
    })
    .flat();


/**
 * @typedef {Object} SchemaObjectType - creates a new type named 'SchemaObjectType'
 * @property {string} name - a string property of SchemaObjectType
 * @property {string} title - a number property of SchemaObjectType
 * @property {string?} type - an optional number property of SchemaObjectType
 * @property {any[]?} fields -
 */

/**
 *
 * finds a specific object by provided `fieldType` name within a schema
 *
 * @param {string} fieldType string to look for
 * @param {SchemaObjectType[]} objectTypes array of schema types
 * @returns SchemaObjectType
 */
const findFieldTypeInObjectType = (fieldType, objectTypes) => {
  return objectTypes.find(type => type.name === fieldType)
}


const MyTool = () => {
    // console.log(translationSchema);
  const cleanTranslationSchema = {
    ...translationSchema,
    types: [
    ...translationSchema.types.map(singleSchema => {
      // console.log(singleSchema);
      if (singleSchema.name === 'internalLink') {
        return {
          ...singleSchema,

          fields: singleSchema.fields.filter(
            (field) => !['to'].includes(field.name)
          ),
        };
      }
      return singleSchema
    }),
    {
      type: 'string',
      name: 'sanity.imageHotspot',
      fields: [],
    },
    {
      type: 'string',
      name: 'sanity.imageCrop',
      fields: [],
    },
    {
      type: 'string',
      name: 'sanity.imageAsset',
      fields: [],
    },
    {
      type: 'string',
      name: 'sanity.fileAsset',
      fields: [],
    },
    {
      type: 'string',
      name: 'slug',
      fields: [],
    }
    ].map((singleSchema) => ({
      ...singleSchema,
      fields: singleSchema.fields?.map(field => ({...field, validation: undefined})),
      preview: undefined,
      inputComponent: undefined,
      validation: undefined,
      icon: undefined,
      fieldsets: undefined
    }))}


    const documentTypes = cleanTranslationSchema.types.filter(schemaObject => schemaObject.type === "document")
    const objectTypes = cleanTranslationSchema.types.filter(schemaObject => schemaObject.type === "object")

    // relevant types for translations in schema
    const objectTypeNameList = objectTypes.map(type => type.name)
    const sanityPrimitiveTypeNameList = ['text', 'string', 'date', 'image', 'array', 'slug']

    const appendFields = (field) => {
      if([...objectTypeNameList, ...sanityPrimitiveTypeNameList].includes(field.type)) {

        // handling arrays which is basically a list of multiple fields
        if(field.type === 'array'){
          return {
            ...field,
            of: field.of.map(arrayField => {
              const nestedFields = findFieldTypeInObjectType(arrayField.type, objectTypes)
              return {
                ...arrayField,
                fields: nestedFields?.fields.map(nestedField => appendFields(nestedField))
              }
            })
          }
        }

        // return possible nested fields
        const nestedFields = findFieldTypeInObjectType(field.type, objectTypes)
        return {
          ...field,
          fields: nestedFields?.fields.map(nestedField => appendFields(nestedField))
        }
      }
    }

    const structure = documentTypes.map(({name}) => {

      // iterate through all fields within documentTypes individually
      return {[name]:cleanTranslationSchema.types.find(type => type.name === name)?.fields.map(field => {
        return appendFields(field)
      })}

    })
    const TRANSLATABLE_FIELD_NAME = 'translatable'
    console.log(
      findAllPaths(structure)
        .filter(path => path.endsWith(TRANSLATABLE_FIELD_NAME))
        .filter(path => get(structure, path))
        .map(path => {
          const lastObjectName = get(structure, path.replace(TRANSLATABLE_FIELD_NAME, 'name'))
          const lastObjectType = get(structure, path.replace(TRANSLATABLE_FIELD_NAME, 'type'))
          const title = get(structure, path.replace(TRANSLATABLE_FIELD_NAME, 'title'))
          const description = get(structure, path.replace(TRANSLATABLE_FIELD_NAME, 'description'))

          // split the path in its elements
          const pathParts = path.split(']')

          const contentPathWithoutLastItem = pathParts.map((_singlePathPart, index) => {
              const lookUpPath = joinArrayUntil(pathParts, index, ']')
              const element = get(structure, lookUpPath)

              if (['array'].includes(element?.type)){
                return element.name + '[]'
              }

              if (['string'].includes(element?.type)){
                return element.name + '.'
              }

              return element?.type ? element?.type + '.': ''
          })
          // special treatment of complex fields
          switch (lastObjectType) {
            case "slug":
              // add name to the end instead of translatable if this is not a special field
              contentPathWithoutLastItem[contentPathWithoutLastItem.length - 1] = `${lastObjectName}.current`
              break;
            // add more special treatment here
            default:
              // add name to the end instead of translatable if this is not a special field
              contentPathWithoutLastItem[contentPathWithoutLastItem.length - 1] = lastObjectName
              break;
          }


          const contentPath = contentPathWithoutLastItem.join('')

          return {
            note: `${title ?? ''}${(title && description) ? ': ' :'' }${description ?? ''}`,
            contentPath
          }

          // return path.replace(TRANSLATABLE_FIELD_NAME, objectName)
        })
    )
    // console.log('[0]page[3].name', get(structure, '[0]page[3].name')); // content
    // console.log('[0]page[3].type', get(structure, '[0]page[3].type')); // array
    // console.log('[0]page[3]of[0].type', get(structure, '[0]page[3]of[0].type')); // m0016
    // console.log('[0]page[3]of[0]fields[2].type', get(structure, '[0]page[3]of[0]fields[2].type')); // string
    // console.log('[0]page[3]of[0]fields[2].name', get(structure, '[0]page[3]of[0]fields[2].name')); // string

    // [0]page[3]of[0]fields[2]buttonText
    // page[3]content[]buttonText
  //     "path": "module[]nav[]flyoutModule.module.module[]testimonialJobTitle",


    // [0]page[3]of[1]fields[4]fields[0]title

    // [0]page[3].name = content
    // [0]page[3]of[1].name = imageSection
    // [0]page[3]of[1]fields[4].name =
    // [0]page[3]of[1]fields[4]fields[0]title

    // link.label
    // --link.anchor--
    // "[0]page[3]of[1]fields[4]fields[0]title"
  // module
  //   {
  //     "path": "module[]nav[]flyoutModule.module.module[]testimonialJobTitle",
  //     "note": "TBD"
  // }

    // const sanitizeSchema = (documentType) => {
    //   const cache = [];
    //   const schema = new Schema(cleanTranslationSchema);

    //   return JSON.parse(
    //     JSON.stringify(
    //       schema.get(documentType),
    //       // this replacer function will resolve the circular structure
    //       (_key, value) => {
    //         if (typeof value === 'object' && value !== null) {

    //           // Duplicate reference found, discard key
    //           if (cache.includes(value)) {
    //             console.log('discarding value', documentType, value);
    //             return false;
    //           }
    //           // Store value in our collection
    //           cache.push(value);
    //         }
    //         return value;
    //       },
    //       2
    //     )
    //   );
    // };



    return (
      <Box padding={4} paddingY={5}>
        <Stack space={4}>
          <Text as="pre">{JSON.stringify(structure, null, 2)}</Text>
          <Text as="p">Tools are just React components!</Text>
        </Stack>
      </Box>
    )

}

export default MyTool
