<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use \DateTime;
use App\Entity\Photo;
use App\Entity\Category;
use App\Entity\Activity;

class DefaultController extends Controller
{

     /**
     * @Route("/", name="home")
     */
    public function homeAction()
    {
        return $this->render('home/index.html.twig', []);
    }

    /**
     * @Route("/test", name="index")
     */
    public function indexAction()
    {
        return $this->render('Default/index.html.twig', []);
    }

    /**
     * @Route("/uploadHandler", name="uploadHandler", methods="POST")
     */
    public function uploadHandlerAction(Request $request)
    {

        $path =json_decode($request->getContent())->dataURL;
        $created =json_decode($request->getContent())->created;
        $categoryuuid =json_decode($request->getContent())->category;
        $activityuuid =json_decode($request->getContent())->activity;

        $folderPath = $this->get('kernel')->getProjectDir() . '/public/uploads/';
        $splited = explode(',', substr( $path , 5 ) , 2);

        $mime=$splited[0];
        $extension = explode(';',explode('/',$mime)[1])[0];
        $data=$splited[1];
        $data = base64_decode($data);
        $nameFile =  uniqid().'.'.$extension ;
        $nameFile_dir = $folderPath .$nameFile ;

        $success = file_put_contents($nameFile_dir, $data);

        if(!$success)
        return new JsonResponse(['path'=>$nameFile,'created'=> $created],Response::HTTP_INTERNAL_SERVER_ERROR);
        else{
            /** Persist Photo */
            $em = $this->getDoctrine()->getManager();
            $photo = new Photo();
            if($categoryuuid) {
                $categoryEntity = $em->getRepository(Category::class)->find($categoryuuid);
                $photo->setCategory($categoryEntity);

            }

            if($activityuuid) {

                $activityEntity = $em->getRepository(Activity::class)->find($activityuuid);
                $photo->setActivity($activityEntity);

            }
            
            $photo->setPath($nameFile);
            $photo->setCreated($created);
            $em->persist($photo);
            $em->flush();
            return new JsonResponse(['path'=>$nameFile,'created'=> $created],Response::HTTP_OK);

        }

    }

    /**
     * @Route("/upload", name="upload", methods="POST")
     */
    public function uploadAction(Request $request)
    {
        return new JsonResponse(['success'=>'Upload'],Response::HTTP_OK);

    }

}
