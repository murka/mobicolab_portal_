import gql from 'graphql-tag';

// export class DroppDoc {
//     document = gql`
//         mutation droppDoc($file: Upload!, $actId: String!, $name: String!) {
//             droppDoc(file: $file, actId: $actId, name: $name) {
//                 id
//             }
//         }
//     `
// }

export class TitlingDoc {
    document = gql`
        mutation titlingDoc($data: TitlingDocInput!) {
            titlingDoc(titlingDocData: $data) {
                title
            }
        }
    `
}

export class SavingDoc {
    document = gql`
        mutation savingDoc($data: SavingDocInput!) {
            savingDoc(savingDocData: $data) {
                id
            }
        }
    `
}

export class SavingAllDocs {
    document = gql`
        mutation savingAllDocs($data: SavingAllDocsInput!) {
            savingAllDocs(savingAllDocsData: $data) {
                id
            }
        }
    `
}

export class RemoveDoc {
    document = gql`
        mutation removeDoc($docId: String!) {
            removeDoc(docId: $docId) {
                id
            }
        }
    `
}

export class DeleteDoc { 
    document = gql`
        mutation deleteDoc($docId: String!, $actId: String!) {
            deleteDoc(docId: $docId, actId: $actId) {
                id
            }
        }
    `
 }