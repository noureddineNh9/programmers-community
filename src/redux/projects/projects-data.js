const PROJECTS_DATA = [
   {
      id: 111,
      titre: "demo project 1",
      description:
         "description demo projectdemo projectdemo projectdemo projectdemo projectdemo project",
      taches: [
         {
            id: 1,
            titre: "task 1 task 1 ",
            description:
               "description task 1 description task 1 description task 1 description task 1 description task 1",
            status: "enCours",
            priorite: "urgent",
            creer_on: "2022-01-13 19:12:43",
            sousTaches: [
               {
                  id: 4434,
                  titre: "subtask 11 ",
                  description:
                     "description subtask 11 description task 1 description task 1 description task 1 description task 1",
                  completed: false,
                  creer_on: "2022-01-9 13:12:43",
                  assignee: {
                     id_programmeur: 3456789,
                     nom: "ali",
                     prenom: "dud",
                     image_profile: "https://picsum.photos/200/300?random=1",
                  },
               },
               {
                  id: 7643,
                  titre: "subtask 22 ",
                  description:
                     "description subtask 22 description task 1 description task 1 description task 1 description task 1",
                  completed: true,
                  creer_on: "2022-01-13 15:16:43",
                  assignee: {
                     id_programmeur: 3456789,
                     nom: "ali",
                     prenom: "dud",
                     image_profile: "https://picsum.photos/200/300?random=1",
                  },
               },
               {
                  id: 7654,
                  titre: "subtask 33 ",
                  description:
                     "description subtask 33 description task 1 description task 1 description task 1 description task 1",
                  completed: true,
                  creer_on: "2022-01-13 15:16:43",
                  assignee: {
                     id_programmeur: 3456789,
                     nom: "ali",
                     prenom: "dud",
                     image: "https://picsum.photos/200/300?random=4",
                  },
               },
            ],
         },
      ],
   },
];

export default PROJECTS_DATA;
