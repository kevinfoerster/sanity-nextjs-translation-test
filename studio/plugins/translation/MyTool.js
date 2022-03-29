// @ts-check
import React from 'react'
import {Box, Text, Stack} from '@sanity/ui'
// import Schema from '@sanity/schema';
import {schema as translationSchema} from '../../schemas/schema'
import { contentTypes } from '../../schemas/documents/page';

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
    const sanityPrimitiveTypeNameList = ['text', 'string', 'date', 'image', 'array']

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
      return cleanTranslationSchema.types.find(type => type.name === name)?.fields.map(field => {
        return appendFields(field)
      })

    })

    // link.label
    // --link.anchor--
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
